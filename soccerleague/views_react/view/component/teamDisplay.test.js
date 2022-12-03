import "react-native";
import "react";
import TeamDisplay from './teamDisplay';
import { test, expect } from "@jest/globals";
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test("Testing team display field", function () {
    const component = renderer
    .create(<TeamDisplay onPress={()=>1}/>).toJSON();
    expect(component).toMatchSnapshot();
}); 