import { InputPicker } from 'rsuite';

function UserPicker({ users, selected }) {
  users.map(item => ({ label: item, value: item }));
  return (
    <InputPicker
      data={users.map(item => ({ label: item, value: item }))}
      style={{ margin: 20 }}
      onSelect={(user) => selected(user)}
      block
    />
  );
}

export default UserPicker;