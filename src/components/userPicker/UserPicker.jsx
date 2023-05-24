import { InputPicker } from 'rsuite';

function UserPicker({ users, selected, clean }) {
  users.map(item => ({ label: item, value: item }));
  return (
    <div>
      <InputPicker
        data={users.map(item => ({ label: item, value: item }))}
        style={{ margin: 20 }}
        onSelect={(user) => selected(user)}
        onClean={() => { selected(null); clean(null) }}
        placeholder={'Seleccione usuario'}
        block
      />
    </div>
  );
}

export default UserPicker;