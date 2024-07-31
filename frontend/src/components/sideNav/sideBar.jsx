import LogoutButton from "./logout";
import MultiConversation from "./multiConversation";
import SearchComponent from "./SearchComponent";

const Sidebar = () => {
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col'>
			<SearchComponent />
			<div className='divider px-3'></div>
            <MultiConversation/>
            <LogoutButton/>
		</div>
	);
};
export default Sidebar;