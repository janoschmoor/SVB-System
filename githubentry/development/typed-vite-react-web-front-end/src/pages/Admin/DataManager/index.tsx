import DataManagerComponent from "../../../components/DataManager";
import LayoutComponent from "../../../components/Layout";


export default function DataManagerPage() {
    return (
        <LayoutComponent>
            
            <DataManagerComponent settings={{}} defaultCollection="users" />

        </LayoutComponent>
    )
}
