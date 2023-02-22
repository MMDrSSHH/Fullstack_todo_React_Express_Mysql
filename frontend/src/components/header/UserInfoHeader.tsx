import { capitalize } from "../../../helpers/functions";
import { useUser } from "../../hooks/queryHooks";
import LogoutBtn from "../logoutbtn/LogoutBtn";

function UserInfoHeader() {
  const { data, isLoading } = useUser();
  const user = data?.data;

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="bg-gray-50 py-3 px-5 rounded-md flex justify-between w-11/12 mb-5 lg:w-1/2">
      <h4 className="inline-block text-lg">{`${capitalize(
        user.firstname
      )} ${capitalize(user.lastname)}`}</h4>
      <LogoutBtn />
    </div>
  );
}

export default UserInfoHeader;
