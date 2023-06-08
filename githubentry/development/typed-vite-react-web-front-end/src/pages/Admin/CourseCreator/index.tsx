import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LayoutComponent from '../../../components/Layout';
import { CreateCourses } from '../../../services/functions';

export default function CourseCreatorPage() {

    const navigate = useNavigate();

    const run = () => {
        CreateCourses({
            period: {
                start: new Date("2023/3/1"),
                end: new Date(new Date("2023/6/30").getTime() + (24 * 60 * 60 * 1000) - 1),
            },
            config: {
                overwrite: true,
            }
        }).then((data: any) => {
            console.log(data);
            navigate('/admin/data-manager', { state: { requestedCollection: data.data.split("/")[0], requestedId: data.data.split("/")[1] } });

        }).catch((error: any) => {
            console.error(error);
            navigate('/admin/data-manager', { state: { requestedCollection: error.data.split("/")[0], requestedId: error.data.split("/")[1] } });

        })
    }

    return (
        <LayoutComponent>

            <Button onClick={() => { run() }}>Invoke CreateCourses</Button>

        </LayoutComponent>
    )
}
