import CategorizeQuestion from "./CategorizeQuestion";
import ClozeQuestion from "./ClozeQuestion";
import ComprehensionQuestion from "./ComprehensionQuestion";

function FormBuilder() {
  return (
    <>
      <CategorizeQuestion />
      <ClozeQuestion />
      <ComprehensionQuestion />
    </>
  );
};

export default FormBuilder;