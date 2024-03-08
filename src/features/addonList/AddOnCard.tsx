// Component for rendering a single add-on's information.
import type React from 'react';
import type { Addon } from '../../types/AddOnTypes';
import { AddonCategory } from '../../types/AddOnTypes';
import '../../styles/tempAddOnStyles.css';

interface AddOnCardProps {
    addOn: Addon;
}

const AddOnCard: React.FC<AddOnCardProps> = ({ addOn }) => {
    return (
        <div className='addon-card'>
        <h1>
            {addOn.name}
        </h1>
        <p>
            {addOn.summary}
        </p>
        </div>
    );
};

export default AddOnCard;