import {render, screen} from "@testing-library/react";
import SignUp from "../pages/SignUp"

describe("SignUp Page", () => {
    it("should render password, password confirmation, full name and email fields", () => {

        const { container } = render(<SignUp />)

        expect(container.querySelector("#email")).toBeInTheDocument();
        expect(container.querySelector("#fullName")).toBeInTheDocument();
        expect(container.querySelector("#password")).toBeInTheDocument();
        expect(container.querySelector("#passwordConfirmation")).toBeInTheDocument();
    });
});
