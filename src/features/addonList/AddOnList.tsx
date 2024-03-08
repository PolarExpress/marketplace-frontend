// Should display all add-ons in a grid/list
import React from 'react';
import AddOnCard from './AddOnCard';
import type { Addon } from '../../types/AddOnTypes';
import { AddonCategory } from '../../types/AddOnTypes';
import '../../styles/tempAddOnStyles.css';

const shortAddon: Addon = {
    id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', // A unique identifier
    name: 'Vis1',
    summary: 'Lorem ipsum dolor sit amet.',
    icon: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/data-chart-2746612-2284656.png', 
    category: AddonCategory.VISUALISATION,
};

const longAddon: Addon = {
    id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6a', // A unique identifier
    name: 'Vis3',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    icon: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/data-chart-2746612-2284656.png', 
    category: AddonCategory.VISUALISATION,
};

const mediumAddon: Addon = {
    id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6b', // A unique identifier
    name: 'Vis2',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    icon: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/data-chart-2746612-2284656.png', 
    category: AddonCategory.VISUALISATION,
};

const addOns: Addon[] = [shortAddon, mediumAddon, longAddon];

const AddOnList = () => {
    return (
        <div className='addons-list'> 
          {addOns.map((addOn) => (
            <AddOnCard addOn={addOn} />
          ))}
        </div>
    );
};

export default AddOnList;