import { writable } from 'svelte/store';


const users = writable([]);

const userStore = {
    subscribe: users.subscribe,
    setMeetups: (usersArray)=>{
        users.set(usersArray);
    },
    addUser:(usersData)=>{
        const newUser ={
            ...usersData,
        };
        users.update(items => {
            return [newUser,...items]
        });
    },
    updateUser: (id,userData) =>{
        users.update(items => {
            const userIndex = items.findIndex(i => i.id === id);
            const updatedUser = {...items[userIndex],...userData};
            const updatedUsers = [...items];
            updatedUsers[userIndex] = updatedUser;
            return updatedUsers;
            
        });
    },
    removeContact:(id)=>{
        users.update(items =>{
            return items.filter(i => i.id !==id);
        })
    } 
    
}

export default userStore;