/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import includes from 'lodash/includes';
import slice from 'lodash/slice';
import get from 'lodash/get';
import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';
import isArray from 'lodash/isArray';
import { withStyles } from '@material-ui/core/styles';
import FormField from '../FormField';
import fieldSetStyles from './field-set-styles';
import getDefaultValue from '../helpers/get-default-value';
import ReorderableFormField from './ReorderableFormField';

// Generated UTILS
const {
  UTIL_CONFIG: {
    ENUM_UTILS: {
      util: { isEnum },
    },
  },
} = require('../generated/utils');

export const RawFieldSetArray = (props) => {
  const {
    startIdx = 0, className, classes,
    schema = {}, uiSchema = {}, definitions = {}, data, path, onMoveItemUp, onMoveItemDown, onDeleteItem, ...rest
  } = props;
  const canReorder = uiSchema && uiSchema['ui:options'] && uiSchema['ui:options'].canReorder;
  const allowRecursive = uiSchema && uiSchema['ui:options'] && uiSchema['ui:options'].allowRecursive;
  const hasSelectWidget = uiSchema && uiSchema['ui:widget'];
  const isRecursiveHole = () => {
    if (schema.infiniteRecursive) {
      return false;
    }

    const getRecursiveRef = path.replace(/\[(.*?)\]/g, '');
    if (getRecursiveRef.includes('.')) {
      const findRecursiveChild = getRecursiveRef.split('.');
      return (findRecursiveChild.length > 2 
              && findRecursiveChild[findRecursiveChild.length - 1] 
              === findRecursiveChild[findRecursiveChild.length - 2]);
    }

    return false;
  };
  schema.items = schema?.items?.$ref ? {
    ...schema.items,
    ...get(definitions, schema.items.$ref
      .replace('#/definitions/', '').replace('/', '.')),
  } : schema.items;
  if (hasSelectWidget) {
    schema.uniqueItems = true;
  }
  return (
    <div className={classes.root}>
      {!isArray(schema.items) && !schema.uniqueItems && (
        <div>
          {(data || []).map((d, idx) => (
            <ReorderableFormField
              key={`${path + idx}`}
              path={`${path}[${startIdx + idx}]`}
              required={schema.required}
              schema={schema.items}
              data={d}
              onMoveItemUp={onMoveItemUp && onMoveItemUp(path, startIdx + idx)}
              onMoveItemDown={onMoveItemDown && onMoveItemDown(path, startIdx + idx)}
              onDeleteItem={onDeleteItem && onDeleteItem(path, startIdx + idx)}
              recursiveDeleteItem={onDeleteItem}
              uiSchema={uiSchema.items}
              first={idx === 0}
              last={idx === data.length - 1}
              canReorder={canReorder}
              definitions={definitions}
              {...rest}
            />
          ))}
          {(!isRecursiveHole() || allowRecursive) && (
            <div className={classes.addItemBtn}>
              <IconButton
                onClick={rest.onAddItem && rest.onAddItem(path, getDefaultValue(schema.items))}
                style={uiSchema['ui:style'] ? {
                  ...uiSchema['ui:style'],
                } : {}}
              >
                <AddCircle /> 
                  <span 
                    style={{ 
                      position: 'relative',
                      right: 5,
                    }}
                  >
                    { uiSchema['ui:options']?.buttonTitle }
                  </span>
              </IconButton>
            </div>
          )}
        </div>
      )}
      {isArray(schema.items) && (data || []).map((d, idx) => {
        if (idx < schema.items.length) {
          return (
            <FormField
                key={`${path + idx}`}
                path={`${path}[${startIdx + idx}]`}
                required={schema.required}
                schema={schema.items[idx]}
                data={d}
                uiSchema={(uiSchema.items || [])[idx]}
                definitions={definitions}
                {...rest}
            />
          );
        }
        return null;
      })}
      {(!isArray(schema.items) && schema.uniqueItems && isEnum(schema.items)) 
        && (
          <FormField
            key={path}
            path={path}
            required={schema.required}
            schema={{ ...schema.items, title: schema.title, parsedArray: true }}
            data={data}
            uiSchema={uiSchema}
            definitions={definitions}
            {...rest}
          />
        )}
      {schema.additionalItems
        && (
          <RawFieldSetArray
            classes={classes}
            path={path}
            startIdx={2}
            required={schema.required}
            schema={{ type: 'array', items: schema.additionalItems }}
            data={slice(data, schema.items.length)}
            uiSchema={uiSchema.additionalItems}
            onMoveItemUp={onMoveItemUp}
            onMoveItemDown={onMoveItemDown}
            onDeleteItem={onDeleteItem}
            definitions={definitions}
            {...rest}
          />
        )}
    </div>
  );
};
export default withStyles(fieldSetStyles.fieldSetArray)(RawFieldSetArray);
