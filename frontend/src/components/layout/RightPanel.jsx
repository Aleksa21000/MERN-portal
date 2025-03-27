import { useQuery } from "@tanstack/react-query";
import { fetchSuggestedUsers } from "../../api/userApi";
import useFollow from "../../hooks/useFollow";

import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import SuggestedUser from "./SuggestedUser";

const RightPanel = () => {
    const { data: suggestedUsers, isLoading } = useQuery({
        queryKey: ["suggestedUsers"],
        queryFn: fetchSuggestedUsers,
    });
    const { follow, isPending } = useFollow();

    if (suggestedUsers?.length === 0) return <div className="md:64 w-0"></div>;

    return (
        <div className="hidden lg:block my-4 mx-2">
            <div className="bg-[#1a202d] p-4 rounded-md sticky top-2">
                <p className="font-bold">Who to follow</p>
                <div className="flex flex-col gap-4">
                    {isLoading ? (
                        <>
                            <RightPanelSkeleton />
                            <RightPanelSkeleton />
                            <RightPanelSkeleton />
                            <RightPanelSkeleton />
                        </>
                    ) : (
                        suggestedUsers.map((user) => (
                            <SuggestedUser
                                key={user._id}
                                user={user}
                                follow={follow}
                                isPending={isPending}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default RightPanel;
