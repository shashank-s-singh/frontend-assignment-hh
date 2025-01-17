import React from "react";
import Spinner from "../components/Spinner";
import SubmissionSuccess from "../components/SubmissionSuccess";

export default function ServiceForm({
  queryType,
  buttonLable,
  setIsSubmissionSuccessfull,
  isSubmissionSuccessfull,
}) {
  const [formValues, setFormValues] = React.useState({
    mobile: "",
    name: "",
    haveInsurance: false,
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const validate = (values) => {
    const errors = {};
    if (!values.mobile) {
      errors.mobile = "Required field";
      errors.mobile = "Enter a valid 10-digit Mobile number starting with 6-9";
    } else if (/^(\d)\1{9}$/.test(values.mobile)) {
      // Check for repeated digits like 1111111111
      errors.mobile = "Mobile number cannot have all digits the same";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    console.log("evemts", formValues);

    e.preventDefault();

    const validationErrors = validate(formValues);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setIsSubmissionSuccessfull(true);
      }, 500);
      setFormValues({
        name: "",
        mobile: "",
        haveInsurance: false,
      });
    }
  };
  return (
    <>
      {isSubmissionSuccessfull ? (
        <SubmissionSuccess />
      ) : (
        <fieldset disabled={loading}>
          <form className="p-4 md:p-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 w-full">
              <div className="">
                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile Number*"
                  className="input-box !w-full"
                  value={formValues.mobile}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value) && value.length <= 10) {
                      handleChange(e);
                    }
                  }}
                />
                {errors.mobile && (
                  <div className="error-msg">{errors.mobile}</div>
                )}
              </div>
              {queryType === "surgery" ? (
                <div className="flex items-center">
                  <input
                    id="checkbox"
                    type="checkbox"
                    name="haveInsurance"
                    checked={formValues.haveInsurance}
                    className="w-4 h-4 text-blue-600 border-red-200 rounded p-2"
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="checkbox"
                    className="ms-2 text-base font-medium text-gray-600"
                  >
                    Do you have Insurance
                  </label>
                </div>
              ) : (
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="input-box !w-full"
                    value={formValues.name}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (/^[a-zA-Z\s]*$/.test(inputValue)) {
                        handleChange(e);
                      }
                    }}
                  />
                  {errors.name && (
                    <div className="error-msg">{errors.name}</div>
                  )}
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`block text-black font-medium rounded-lg px-5 py-2.5 text-center mt-4 ${
                loading ? "bg-teal-300" : "bg-teal-400 hover:bg-teal-500"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                {loading ? "Submitting..." : buttonLable}
                {loading && <Spinner />}
              </span>
            </button>
          </form>
        </fieldset>
      )}
    </>
  );
}
