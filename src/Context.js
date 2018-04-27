import React from 'react';
import Cookies from 'js-cookie';
import faker from 'faker';


const username = Cookies.get('username');
const userName = username || faker.name.findName();
if (!username) Cookies.set('username', userName);

const currentUser = { name: userName };


export const defaultContextValue = { currentUser };

export default React.createContext();
