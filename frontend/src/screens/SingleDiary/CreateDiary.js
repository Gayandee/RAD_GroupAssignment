import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createDiaryAction } from "../../actions/diaryActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";

function CreateDiary({ history }) {
    const [heading, setHeading] = useState("");
    const [diarybody, setDiarybody] = useState("");

    const dispatch = useDispatch();

    const diaryCreate = useSelector((state) => state.diaryCreate);
    const { loading, error, diary } = diaryCreate;

    console.log(diary);

    const resetHandler = () => {
        setHeading("");
        setDiarybody("");
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createDiaryAction(heading, diarybody));
        if (!heading || !diarybody) return;

        resetHandler();
        history.push("/mydiaries");
    };

    useEffect(() => {}, []);

    return (
        <MainScreen title="Create an Diary">
            <Card>
                <Card.Header>Create a new Diary</Card.Header>
                <Card.Body>
                    <Form onSubmit={submitHandler}>
                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                        <Form.Group controlId="heading">
                            <Form.Label>Heading</Form.Label>
                            <Form.Control
                                type="heading"
                                value={heading}
                                placeholder="Enter the heading"
                                onChange={(e) => setHeading(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="diarybody">
                            <Form.Label>Diary Body</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={diarybody}
                                placeholder="Enter the diary body"
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
                            Create Diary
                        </Button>
                        <Button className="mx-2" onClick={resetHandler} variant="danger">
                            Reset
                        </Button>
                    </Form>
                </Card.Body>

                <Card.Footer className="text-muted">
                    Creatd on: {new Date().toLocaleDateString()}
                </Card.Footer>
            </Card>
        </MainScreen>
    );
}

export default CreateDiary;
                        