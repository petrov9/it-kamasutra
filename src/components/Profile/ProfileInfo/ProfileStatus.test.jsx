import {create} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("Profile status component", () => {

    test("status from props should be in the state", () => {

        let statusText = "my status";
        const component = create((<ProfileStatus status={statusText}/>))
        const instance = component.getInstance();
        expect(instance.state.status).toBe(statusText);
    });

    test("after creation <span> should be displayed", () => {

        let statusText = "my status";
        const component = create((<ProfileStatus status={statusText}/>))
        const instance = component.root;
        let span = instance.findByType("span");
        expect(span.children).toEqual([statusText]);
    });

    test("after creation <input> shouldn't be displayed", () => {

        let statusText = "my status";
        const component = create((<ProfileStatus status={statusText}/>))
        const instance = component.root;

        expect(() => {
            let input = instance.findByType("input");
        }).toThrow()
    });

    test("input should be displayed in edit mode instead of span", () => {

        let statusText = "my status";
        const component = create((<ProfileStatus status={statusText}/>))
        const instance = component.root;
        let span = instance.findByType("span");
        span.props.onDoubleClick();

        let input = instance.findByType("input");
        expect(input.props.value).toBe(statusText);
    });

    test("callback should be called", () => {
        const mockCallback = jest.fn()

        let statusText = "my status";
        const component = create((<ProfileStatus updateUserStatus={mockCallback} status={statusText}/>))
        const instance = component.getInstance()
        instance.deactivateEditMode()

        expect(mockCallback.mock.calls.length).toBe(1);
    });

});