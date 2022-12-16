import { fireEvent, render, screen } from "@testing-library/react";
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from "./components/home/header";
import Home from "./components/home/home";
import Signin from "./components/signin/signin";
import Advertisement from "./components/layout/advertisement";
import Services from "./components/layout/services";
import Doctors from "./components/layout/doctors";

const makeSutHome = () => {
  return render(<Home />);
};

const makeSutHeader = () => {
  return render(<BrowserRouter><Header /></BrowserRouter>);
};

const makeSutSignin = (isGU) => {
  return render(<BrowserRouter><Signin isGuestUser={isGU} /></BrowserRouter>);
};

const makeSutServices = () => {
  return render(<Services />);
};

const makeSutDoctors = () => {
  return render(<Doctors />);
};

describe("<Home />", () => {
  test("Should render label correctly", () => {
    makeSutHome()

    expect(screen.getByText(/Welcome To Wellness Center/)).toBeInTheDocument();
  });
});


describe("<Header />", () => {
  test("Should render sigin component when click on signin", () => {
    makeSutHeader();

    fireEvent.click(screen.getByText(/Signin/));
    expect(screen.getByText(/Signin/)).toBeInTheDocument();
  });

  test("Should render guestuser component when click on guestuser", () => {
    makeSutHeader();
    fireEvent.click(screen.getByText(/GuestUser?/));
    expect(screen.getByText(/GuestUser/)).toBeInTheDocument();
  });

  test("Should render signup component when click on signup", () => {
    makeSutSignin(true);
    fireEvent.click(screen.getByText(/Signup/));
    expect(screen.getByText(/Signup/)).toBeInTheDocument();
  });

  test("Should render services component when click on services", () => {
    makeSutHeader(true);
    fireEvent.click(screen.getByText(/Services/));
    expect(screen.getByText(/Services/)).toBeInTheDocument();
  });

  test("Should render doctors component when click on doctors", () => {
    makeSutHeader(true);
    fireEvent.click(screen.getByText(/Doctors/));
    expect(screen.getByText(/Doctors/)).toBeInTheDocument();
  });

});


describe("Signin render Page", () => {
  it('render 2 input components', () => {
    makeSutSignin(false);
    expect(screen.getByLabelText(/Username*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password*/i)).toBeInTheDocument();
  });

  it('renders a siginin button', () => {
    makeSutSignin(false);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});

describe("GuestUser render Page", () => {
  it('render 2 input components', () => {
    makeSutSignin(false);
    expect(screen.getByLabelText(/Username*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password*/i)).toBeInTheDocument();
  });

  it('renders a GuestUser button', () => {
    makeSutSignin(false);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});

describe("Signup render Page", () => {
  it('render 2 input components', () => {
    makeSutSignin(false);
    expect(screen.getByLabelText(/Username*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password*/i)).toBeInTheDocument();
  });

  it('renders a Signup button', () => {
    makeSutSignin(false);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});

describe("Renders home page after signin", () => {

  it('renders a button', () => {
    makeSutSignin(true);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});

describe("<Services />", () => {

  test("renders services page", () => {
    makeSutServices(true);
   
   expect(screen.getByText(/Immunizations/)).toBeInTheDocument();
  });
});

describe("<Doctors />", () => {

  test("renders doctors page", () => {
    makeSutDoctors(true);
   
   expect(screen.getByText(/DR. Lisa Fernandas/)).toBeInTheDocument();
  });
});
