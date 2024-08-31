import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./ContactForm.module.css";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contactsSlice";

const ContaktSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const initialValues = {
  name: "",
  number: "",
};

const ContactForm = () => {
  useSelector((state) => state.contacts.contacts);
  const dispatch = useDispatch();

  const onAdd = (newContact) => {
    const finalContact = {
      ...newContact,
      id: nanoid(),
    };
    dispatch(addContact(finalContact));
  };

  const handleSubmit = (values, actions) => {
    onAdd(values);
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContaktSchema}
    >
      <Form className={css.form}>
        <label className={css.inputLabel}>
          <span className={css.span}>Name</span>
          <Field
            className={css.input}
            type="text"
            name="name"
            placeholder="Bunny Baxter"
          />
          <ErrorMessage className={css.error} name="name" component="span" />
        </label>

        <label className={css.inputLabel}>
          <span className={css.span}>Number</span>
          <Field
            className={css.input}
            type="text"
            name="number"
            placeholder="111-11-11"
          />
          <ErrorMessage className={css.error} name="number" component="span" />
        </label>

        <button className={css.submitBtn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
