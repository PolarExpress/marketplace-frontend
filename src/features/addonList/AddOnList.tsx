// Should display all add-ons in a grid/list

import React from 'react';
import AddOnCard from './AddOnCard';

const AddOnList = () => {
    return (
        <>
            <AddOnCard />
            <AddOnCard />
            <AddOnCard />
        </>
    );
};

export default AddOnList;