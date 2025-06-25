import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomSelect from "./CustomSelect";

// ✅ Extended validation schema
const validationSchema = Yup.object({
  candidateType: Yup.string().required("Please select a candidate type"),
  experienceYears: Yup.number()
    .typeError("Must be a number")
    .integer("Must be an integer")
    .min(0, "Minimum is 0")
    .required("Experience is required"),
});

export default function CandidateForm() {
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Candidate Form</h2>

      <Formik
        initialValues={{ candidateType: "", experienceYears: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          console.log("Submitted values:", values);
          actions.setSubmitting(false);
        }}
      >
        <Form className="space-y-4">
          {/* Custom Select */}
          <Field
            name="candidateType"
            label="Candidate Type"
            placeholder="Select type"
            optionsList={[
              { label: "Internal", value: 1 },
              { label: "External", value: 2 },
              { label: "Referral", value: 3 }
            ]}
            component={CustomSelect}
            required
            showSearch
          />

          {/* Numeric Input Field */}
          <div>
            <label htmlFor="experienceYears" className="block text-sm mb-1">
              Years of Experience <span className="text-red-500">*</span>
            </label>
            <Field
              name="experienceYears"
              type="text"
              inputMode="numeric"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              placeholder="Enter years"
            />
            <ErrorMessage
              name="experienceYears"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}
