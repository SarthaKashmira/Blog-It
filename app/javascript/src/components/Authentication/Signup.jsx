import React, { useEffect, useState } from "react";

import authApi from "apis/auth";
import organizationsApi from "apis/organizations";
import SignupForm from "components/Authentication/Form/Signup";

const Signup = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await authApi.signup({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        organization_id: selectedOrganization,
      });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handleOrganizations = async () => {
    try {
      const {
        data: { organizations },
      } = await organizationsApi.fetch();
      logger.info(organizations);
      setOrganizations(organizations);
      setSelectedOrganization(organizations[0].id);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    handleOrganizations();
  }, []);

  return (
    <SignupForm
      handleSubmit={handleSubmit}
      loading={loading}
      organizations={organizations}
      setEmail={setEmail}
      setName={setName}
      setPassword={setPassword}
      setPasswordConfirmation={setPasswordConfirmation}
      setSelectedOrganization={setSelectedOrganization}
    />
  );
};

export default Signup;
