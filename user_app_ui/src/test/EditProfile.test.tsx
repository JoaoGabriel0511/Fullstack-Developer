import {render } from "@testing-library/react";
import EditProfile from "../pages/EditProfile";

describe("SignUp Page", () => {
    it("should render password, password confirmation, full name and email fields", () => {

        const { container } = render(<EditProfile />)

        expect(container.querySelector("#email")).toBeInTheDocument();
        expect(container.querySelector("#fullName")).toBeInTheDocument();
        expect(container.querySelector("#password")).toBeInTheDocument();
        expect(container.querySelector("#passwordConfirmation")).toBeInTheDocument();
    });
});
