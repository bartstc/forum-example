import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TextAreaFieldGroup from './TextAreaFieldGroup';
import { checkProps } from '../../../utils/testHelpers';

describe('TextAreaFieldGroup', () => {

  let wrapper;
  const props = {
    name: 'email',
    placeholder: 'email',
    value: 'email@gmail.com',
    error: 'error',
    info: 'info',
    onChange: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<TextAreaFieldGroup {...props} />);
  });

  it('renders TextAreaFieldGroup without errors', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should NOT throw a warning', () => {
    const propsError = checkProps(TextAreaFieldGroup, props);
    expect(propsError).toBeUndefined();
  });

});

