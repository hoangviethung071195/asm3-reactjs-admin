import CustomTable from 'components/Table/table';
import { PagingData, pagingEvent } from 'models/Pagination.model';
import { PropsWithChildren, useEffect, useState } from "react";
import { initialPagingData } from 'utils/constant/models/pagination';
import { userColumns } from 'utils/constant/table/columns';
import { UserModel } from '../../models/User.model';
import { getUsers } from '../../service/users.service';

function Users(props: PropsWithChildren) {
  const [users, setUsers] = useState<PagingData<UserModel>>(initialPagingData);

  useEffect(() => {
    getUsers().then((res) => setUsers(res));
  }, []);

  // const inputEl = useRef(null);
  // function updateRole(id: string, role: number) {
  //   updateUser({ role: +role }).then((r) => {
  //     if (r) {
  //       toast.success("Updated user successfully.");
  //     }
  //   });
  // }

  // function changeRole(el, u) {
  //   console.log("el ", el);
  //   console.log("u ", u);
  //   const user = users.find((item) => item._id === u._id);
  //   user.role = +el.target.value;
  //   setUsers(cloneDeep(users));
  // }

  function onPagingChange(e: pagingEvent) {
    // setPaging(e);
  };

  console.log("users ", users);

  return (
    <CustomTable columns={userColumns} tableData={users} onPagingChange={onPagingChange} />
  );
}

export default Users;
