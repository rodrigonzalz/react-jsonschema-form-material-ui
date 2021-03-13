// empty
import isEmpty from 'lodash/isEmpty';

// Context
import { EventContext, LoadingContext } from '../../../helpers/context';

export default ({
  schema = {},
  uiSchema = {},
  xhrSchema = {},
  isCustomComponent,
  inputValue,
  onChange,
  onXHRSchemaEvent,
  onKeyDown,
  creatableSelectValue,
  onCreatableSelectChange,
  onInputChange,
  htmlid,
  data,
  objectData,
  dynamicKeyField,
  interceptors,
}) => {
  const widget = uiSchema['ui:widget'];
  const options = uiSchema['ui:options'] || uiSchema['ui:props'] || {};
  const interceptorFunc = uiSchema['ui:interceptor'] || options.onBeforeChange;
  const { type } = schema;
  const rv = isCustomComponent
    ? {
      onKeyDown,
      ...isCustomComponent({ onChange }).props,
      ...options,
    }
    : {
      onChange: (givenValue, uiValue, forceDeleteUIData = false) => {
        let value = givenValue;
        if (value === '' || value === null) {
          value = undefined;
        }
        // Call Interceptor if it exists
        if (
          typeof interceptors[interceptorFunc] === 'function'
            && !isEmpty(interceptorFunc)
        ) {
          const { formData, uiData } = interceptors[interceptorFunc]({
            value,
            uiValue,
            options,
          });
          return onChange(formData, uiData, forceDeleteUIData);
        }
        return onChange(value, uiValue, forceDeleteUIData);
      },
      onKeyDown,
      uiSchema,
      schema,
      xhrSchema,
      onXHRSchemaEvent,
      options,
      widget,
      type,
      EventContext,
      LoadingContext,
      htmlid,
    };

  if (dynamicKeyField === 'key') {
    rv.isKeyField = true;
    rv.onBlur = onChange;
    delete rv.onChange;
  }

  if (
    isCustomComponent
    && isCustomComponent({ onChange })
    && isCustomComponent({ onChange }).props
    && isCustomComponent({ onChange }).props.onChange
  ) {
    rv.onChange = (givenValue, uiValue) => {
      let value = givenValue;
      if (value === '' || value === null) {
        value = undefined;
      }
      // Call Interceptor if it exists
      if (
        typeof interceptors[interceptorFunc] === 'function'
        && !isEmpty(interceptorFunc)
      ) {
        const { formData, uiData } = interceptors[interceptorFunc]({
          value,
          uiValue,
          options,
        });
        return isCustomComponent({ onChange }).props.onChange(formData, uiData);
      }
      return isCustomComponent({ onChange }).props.onChange(value, uiValue);
    };
    if (schema.default && !data) {
      isCustomComponent({ onChange }).props.onChange(schema.default);
    }
  }
  else if (options.disabled) {
    if (typeof options.disabled === 'boolean') {
      rv.disabled = options.disabled;
    }
    else if (typeof options.disabled === 'function') {
      rv.disabled = options.disabled.call(null, data, objectData);
    }
  }
  else if (
    (schema.default && !data) 
    || (
      typeof schema.default === 'boolean' 
      && typeof data !== 'boolean'
      && schema.type === 'boolean'
    )
  ) {
    onChange(schema.default);
  }
  
  return rv;
};
