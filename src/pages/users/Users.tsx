import CustomTable from 'components/Table/Table';
import { PagingData, pagingEvent } from 'models/Pagination.model';
import { PropsWithChildren, useEffect, useState } from "react";
import { initialPagingData, initialPagingEvent } from 'utils/constant/models/pagination';
import { userColumns } from 'utils/constant/table/columns';
import { UserModel } from '../../models/User.model';
import { getUsers } from '../../service/users.service';
import LoadingOverlay from 'layout/loading-overlay/LoadingOverlay';

function Users(props: PropsWithChildren) {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<PagingData<UserModel>>(initialPagingData);
  const [paging, setPaging] = useState(initialPagingEvent);
  const { page, limit } = paging;

  useEffect(() => {
    setLoading(true);
    getUsers(page, limit).then((res) => {
      setUsers(res);
      setLoading(false);
    });
  }, [paging]);

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
    setPaging(e);
  };

  console.log("users ", users);

  return (
    <LoadingOverlay loading={loading}>
      <CustomTable columns={userColumns} tableData={users} onPagingChange={onPagingChange} />
    </LoadingOverlay>
  );
}

export default Users;
