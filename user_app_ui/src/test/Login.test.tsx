import {render} from "@testing-library/react";
import Login from "../pages/Login";

jest.mock('react-router-dom', () => ({
    useLocation: jest.fn().mockReturnValue({
        state: {
            userCreated: true
        },
    }),
}));

describe("Login Page", () => {
    it("should render password and email fields", () => {


        const { container } = render(<Login />)

        expect(container.querySelector("#email")).toBeInTheDocument();
        expect(container.querySelector("#password")).toBeInTheDocument();
    });
});