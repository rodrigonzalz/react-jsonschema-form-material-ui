import getDefaultValue from '../get-default-value';

describe('getDefaultValue', () => {
  it('works for string', () => {
    // assemble
    const data = {
      type: 'string',
    };
    const expected = '';

    // act
    const actual = getDefaultValue(data);

    // assert
    expect(actual).toEqual(expected);
  });
  it('works for string with default value', () => {
    // assemble
    const data = {
      type: 'string',
      default: 'foo',
    };
    const expected = 'foo';

    // act
    const actual = getDefaultValue(data);

    // assert
    expect(actual).toEqual(expected);
  });
  it('works for array', () => {
    // assemble
    const data = {
      type: 'array',
    };
    const expected = [];

    // act
    const actual = getDefaultValue(data);

    // assert
    expect(actual).toStrictEqual(expected);
  });
  it('works for boolean', () => {
    // assemble
    const data = {
      type: 'boolean',
    };
    const expected = false;

    // act
    const actual = getDefaultValue(data);

    // assert
    expect(actual).toStrictEqual(expected);
  });
  it('works for object', () => {
    // assemble
    const data = {
      type: 'object',
    };
    const expected = {};

    // act
    const actual = getDefaultValue(data);

    // assert
    expect(actual).toStrictEqual(expected);
  });
  it('works for object with properties', () => {
    // assemble
    const data = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
      },
    };
    const expected = { name: '' };

    // act
    const actual = getDefaultValue(data);

    // assert
    expect(actual).toStrictEqual(expected);
  });
  it('works for object with properties with default values', () => {
    // assemble
    const data = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          default: 'bar',
        },
      },
    };
    const expected = { name: 'bar' };

    // act
    const actual = getDefaultValue(data);

    // assert
    expect(actual).toStrictEqual(expected);
  });
  it('works for nested object', () => {
    // assemble
    const data = {
      type: 'object',
      properties: {
        name: {
          type: 'object',
          properties: {
            firstName: {
              type: 'string',
            },
          },
        },
      },
    };
    const expected = { name: { firstName: '' } };

    // act
    const actual = getDefaultValue(data);

    // assert
    expect(actual).toStrictEqual(expected);
  });
});
