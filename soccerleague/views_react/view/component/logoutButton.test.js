import "react-native";
import "react";
import LogoutButton from "./logoutButton";
import { test, expect } from "@jest/globals";
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test("Testing logout functionality", function () {
    const component = renderer
    .create(<LogoutButton onPress={()=>1}/>).toJSON();
    expect(component).toMatchSnapshot();
}); 