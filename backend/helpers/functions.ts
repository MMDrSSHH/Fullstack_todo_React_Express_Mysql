interface Errors {
  firstname?: "firstname required" | "firstname must be atleast 3 characters";
  lastname?: "lastname required" | "lastname must be atleast 3 characters";
  username?: "username required" | "username must be atleast 3 characters";
  password?: "password required" | "password must be atleast 5 characters";
  email?: "email required" | "invalid email";
}

interface ValidateData {
  firstname?: string;
  lastname?: string;
  username: string;
  password: string;
  email?: string;
}

export function validate(data: ValidateData, type: "login" | "signin") {
  const errors: Errors = {};

  if (!data.username) {
    errors.username = "username required";
  } else if (data.username.length < 3) {
    errors.username = "username must be atleast 3 characters";
  }

  if (!data.password) {
    errors.password = "password required";
  } else if (data.password.length < 5) {
    errors.password = "password must be atleast 5 characters";
  }

  if (type === "signin") {
    if (!data.firstname) {
      errors.firstname = "firstname required";
    } else if (data.firstname.length < 3) {
      errors.firstname = "firstname must be atleast 3 characters";
    }

    if (!data.lastname) {
      errors.lastname = "lastname required";
    } else if (data.lastname.length < 3) {
      errors.lastname = "lastname must be atleast 3 characters";
    }

    if (!data.email) {
      errors.email = "email required";
    } else if (!emailValidation(data.email)) {
      console.log(data)
      errors.email = "invalid email";
    }
  }

  return errors;
}

export function emailValidation(email: string): boolean {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export function getDate(days: number): Date {
  const date = new Date();

  date.setDate(date.getDate() + days);

  return date;
}
