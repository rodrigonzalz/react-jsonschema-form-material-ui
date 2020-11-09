// import update from 'immutability-helper';
import forOwn from 'lodash/forOwn';
import mapValues from 'lodash/mapValues';
import flatten from 'lodash/flatten';
import difference from 'lodash/difference';
import rules from './rules';

const isSubset = (source, target) => !difference(flatten(source), flatten(target)).length;
const validationResult = (schema, uiSchema, value, customValidations) => {
  const rv = [];
  forOwn(rules, (rule, ruleId) => {
    const result = rule(schema, uiSchema, value);
    if (result) {
      rv.push({
        rule: ruleId,
        ...result,
      });
    }
  });
  if (
    uiSchema
    && uiSchema['ui:validations']
    && customValidations
    && isSubset(
      Object.keys(uiSchema['ui:validations']),
      Object.keys(customValidations),
    )
  ) {
    forOwn(customValidations, (rule, ruleId) => {
      const result = rule(schema, uiSchema, value);
      if (result) {
        rv.push({
          rule: ruleId,
          ...result,
        });
      }
    });
  }
  return rv;
};

const getFieldSpec = (schema, uiSchema, value, customValidations) => {
  if (value === null) {
    return [];
  }
  if (typeof value === 'number' || typeof value === 'string') {
    return validationResult(schema, uiSchema, value, customValidations);
  }
  return mapValues(schema.properties, (s, p) => getFieldSpec(s, uiSchema[p], value[p], customValidations));
};

export default (schema, uiSchema, data, customValidations) => {
  const spec = getFieldSpec(schema, uiSchema, data, customValidations);
  return { ...spec };
};
