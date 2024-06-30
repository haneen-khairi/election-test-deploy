import "./checkbox.css";

interface Props {
  checked?: boolean;
  onChange: (e?: any) => void;
  name?: any
}
const CheckBox = ({ checked, onChange , name}: Props) => {
  return (
    <label className="custom-checkbox">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="custom-checkbox-checkmark"></span>
      {name}
    </label>
  );
};

export default CheckBox;
