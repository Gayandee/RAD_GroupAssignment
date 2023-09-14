import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteDiaryAction, updateDiaryAction } from "../../actions/diaryActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";

function SingleDiary({ match, history }) {
    const [heading, setHeading] = useState();
    const [diarybody, setDiarybody] = useState();
    const [date, setDate] = useState("");

    const dispatch = useDispatch();

    const diaryUpdate = useSelector((state) => state.diaryUpdate);
    const { loading, error } = diaryUpdate;

    const diaryDelete = useSelector((state) => state.diaryDelete);
    const { loading: loadingDelete, error: errorDelete } = diaryDelete;

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteDiaryAction(id));
        }
        history.push("/mydiaries");
    };

    useEffect(() => {
        const fetching = async () => {
            const { data } = await axios.get(`/api/diaries/${match.params.id}`);
            
            setHeading(data.heading);
            setDiarybody(data.diarybody);
            setDate(data.updatedAt);
        };
        
        fetching();
    }, [match.params.id, date]);
        
    const resetHandler = () => {
        setHeading("");
        setDiarybody("");
    }

    const updateHandler = (e) => {
        e.preventDefault();
        dispatch(updateDiaryAction(match.params.id, heading, diarybody));
        if (!heading || !diarybody) return;

        resetHandler();
        history.push("/mydiaries");
    };

    return (
        <MainScreen title="Edit Diary">
            <Card>
                <Card.Header>Edit Diary</Card.Header>
                <Card.Body>
                    <Form onSubmit={updateHandler}>
                        {loadingDelete && <Loading />}
                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                        {errorDelete && (
                            <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
                        )}
                        <Form.Group controlId="heading">
                            <Form.Label>Heading</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Heading"
                                value={heading}
                                onChange={(e) => setHeading(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="diarybody">
                            <Form.Label>Diary Body</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter Diary Body"
                                rows={5}
                                value={diarybody}
                                onChange={(e) => setDiarybody(e.target.value)}
                            />
                        </Form.Group>
                        {diarybody && (
                            <Card>
                                <Card.Header>Diary Preview</Card.Header>
                                <Card.Body>
                                    <ReactMarkdown>{diarybody}</ReactMarkdown>
                                </Card.Body>
                            </Card>
                        )}
                        {loading && <Loading size={50} />}
                        <Button type="submit" variant="primary">
                            Update Diary
                        </Button>
                        <Button
                            className="mx-2"
                            variant="danger"
                            onClick={() => deleteHandler(match.params.id)}
                        >
                            Delete Diary
                        </Button>
                    </Form>
                </Card.Body>

                <Card.Footer className="text-muted">
                    Last Updated on {date.substring(0, 10)}
                </Card.Footer>
            </Card>
        </MainScreen>
    );
}

export default SingleDiary;
