import {
    Button,
    Chip,
    Select,
    Selection,
    SelectItem,
    SelectSection,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    User
} from "@nextui-org/react";
import {Key, useCallback, useEffect, useState} from "react";
import {CourseService, CourseWithSubscribers, SkillsService} from "../api";
import {RootState} from "../redux/store.tsx";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const columns = [
    {uid: 'name', name: 'NAME'},
    {uid: 'teacher', name: 'TEACHER'},
    {uid: 'chapters', name: 'CHAPTERS'},
    {uid: 'subscribers', name: 'STUDENTS'},
];

const FindCourses = () => {
    const [availableChapters, setAvailableChapters] = useState<{ name: string, chapters: string[] }[]>([]);
    const [chapters, setChapters] = useState<Selection>(new Set([]));
    const [courses, setCourses] = useState<CourseWithSubscribers[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
    const [enrolling, setEnrolling] = useState(false);
    const currentUser = useSelector((state: RootState) => state.user.user);
    const navigate = useNavigate();
    useEffect(() => {
        SkillsService.getAllSkills().then((response) => {
            setAvailableChapters(response.map((skill) => ({
                name: skill.name,
                chapters: skill.chapters
            })));
        });
    }, []);
    useEffect(() => {
        CourseService.find({chapters: Array.from(chapters) as string[]}).then((response) => {
            setCourses(response);
        });
    }, [chapters]);

    const enroll = useCallback(() => {
        setEnrolling(true);
        CourseService.enroll(currentUser?.email ?? '', {
            courses: Array.from(selectedKeys) as string[],
        }).then(() => {
            setSelectedKeys(new Set([]));
            setEnrolling(false);
        });
    }, [selectedKeys]);

    const renderCell = useCallback((course: CourseWithSubscribers, columnKey: Key) => {
        switch (columnKey) {
            case "name":
                return course.name;
            case "teacher":
                return (
                    <User name={course.teacher.name} description={course.teacher.email}
                          avatarProps={{radius: "lg", src: undefined}}/>
                )
            case "chapters":
                return course.chapters.map((chapter) => (
                    <Chip key={chapter} color="primary" className="m-1">
                        {chapter}
                    </Chip>
                ))
            case "subscribers":
                return course.subscribers
        }
    }, []);
    return (
        <div>
            <div className="flex flex-row gap-4 justify-between w-full mb-3">
                <h1 className="text-4xl font-medium justify-center mb-5 flex-grow">
                    Find Courses
                </h1>
                <div className="w-1/2 flex flex-row items-center gap-3 justify-end">
                    <Button color="primary" size="lg" isDisabled={Array.from(selectedKeys).length === 0}
                            isLoading={enrolling} onClick={enroll}>Enroll</Button>
                    <Select selectionMode="multiple" placeholder="Chapters" onSelectionChange={setChapters}
                            label="Search" className="flex-shrink inline-block min-w-0 w-1/2">
                        {availableChapters.map((skill) => (
                            <SelectSection key={skill.name} title={skill.name}>
                                {skill.chapters.map((chapter) => (
                                    <SelectItem key={chapter} value={chapter}>
                                        {chapter}
                                    </SelectItem>
                                ))}
                            </SelectSection>
                        ))}
                    </Select>
                </div>
            </div>
            {Array.from(chapters).length > 0 &&
                <Table aria-label="Example table with custom cells" selectionMode="multiple"
                       selectedKeys={selectedKeys}
                       onSelectionChange={setSelectedKeys}
                       onRowAction={(key: Key) => {
                           navigate(`/courses/${key}`)
                       }}>
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={courses}>
                        {(item) => (
                            <TableRow key={item._id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>}
        </div>
    );
};

export default FindCourses;
