import LayoutComponent from '../../components/Layout';
import { useAuth } from '../../contexts/AuthContext';
import DataUI from '../../schema/DataUI';

export default function ProfilePage() {

    const { currentUser } = useAuth();
    const { currentUserData } = useAuth();

    return (
        <LayoutComponent>

            {
                currentUserData ? 
                    <DataUI data={currentUserData} path={"db/users/"+currentUserData.id} depth={2} config={{}} />
                : null
            }
            
        </LayoutComponent>
    )
}
