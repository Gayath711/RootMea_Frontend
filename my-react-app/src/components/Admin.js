import React, { useState } from 'react';

import { PERMISSIONS } from './permissions';

const Admin = ({ user, setUser }) => {
    const available_permissions = ["admin", "create_form", "view_care_form", "view_encounter_form",]

    const [list1, setList1] = useState(available_permissions.filter(permission => !user.permissions.includes(permission)));
    const [list2, setList2] = useState(user.permissions);

    const moveItem = (fromList, toList, item, direction) => {
        const newFromList = fromList.filter(i => i !== item);
        const newToList = [...toList, item]
        if (direction === 'right') {
            setList1(newFromList);
            setList2(newToList);
            setUser(prevUser => ({
                ...prevUser,
                permissions: newToList
            }));
            console.log("newToList", newToList)
            console.log("user", user)
            localStorage.setItem("permissions", newToList)
        } else {
            setList1(newToList);
            setList2(newFromList);
            setUser(prevUser => ({
                ...prevUser,
                permissions: newFromList
            }));
            localStorage.setItem("permissions", [newFromList])
        }

        console.log("newFromList", newFromList)
        console.log("newToList", newToList)
        console.log("user", user)
    };

    return (
        <div>
            <div className='flex flex-row mt-10 justify-center space-x-10'>
                <div>
                    <label for="availableScreens" class="block mb-2 text-sm font-medium ">Available Screens</label>
                    <select id="availableScreens" size="5" class="bg-gray-50 border border-gray-300  text-sm rounded-lg block w-full p-2.5 dark overflow-hidden">

                        {list1.map(item => (
                            <option key={item} onClick={() => moveItem(list1, list2, item, 'right')}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label for="permittedScreens" class="block mb-2 text-sm font-medium ">Permitted Screens</label>
                    <select id="permittedScreens" size="5" class="bg-gray-50 border border-gray-300  text-sm rounded-lg block w-full p-2.5 dark overflow-hidden">
                        {list2.map(item => (
                            <option key={item} onClick={() => moveItem(list2, list1, item, 'left')}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Admin;