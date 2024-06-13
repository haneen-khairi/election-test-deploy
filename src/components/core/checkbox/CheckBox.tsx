import "./checkbox.css";

interface Props {
  checked?: boolean;
  onChange: () => void;
}
const CheckBox = ({ checked, onChange }: Props) => {
  return (
    <label className="custom-checkbox">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="custom-checkbox-checkmark"></span>
    </label>
  );
};

export default CheckBox;
