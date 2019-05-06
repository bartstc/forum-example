import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TextFieldGroup from './TextFieldGroup';
import { checkProps } from '../../../utils/testHelpers';

describe('TextAreaFieldGroup', () => {

  let wrapper;
  const props = {
    name: 'string',
    placeholder: 'string',
    value: 'string',
    label: 'string',
    error: 'string',
    info: 'string',
    type: 'string',
    onChange: jest.fn(),
    disabled: 'string'
  };

  beforeEach(() => {
    wrapper = shallow(<TextFieldGroup {...props} />);
  });

  it('renders TextFieldGroup without errors', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should NOT throw a warning', () => {
    const propsError = checkProps(TextFieldGroup, props);
    expect(propsError).toBeUndefined();
  });

});

