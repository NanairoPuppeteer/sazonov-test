import { Fragment, useState } from "react";
import { Col, Modal, Pagination, Row, Stack } from "react-bootstrap";
import "./GamesList.css";

function ImageModal({ thumbUrl, bigUrl, size })
{
    const [show, setShow] = useState(false);

    function handleShow() {
        setShow(true);
    }

    function handleClose() {
        setShow(false);
    }

    return (
        <>
            <img src={thumbUrl} onClick={handleShow}/>
            <Modal size={size} show={show} onHide={handleClose}>
                <Modal.Header closeButton />
                <Modal.Body>
                    <img src={bigUrl} className="modalImg"/>
                </Modal.Body>
            </Modal>
        </>
    );
}

function GamesList({ games }) {
    const [page, setPage] = useState(0);

    let displayGames = games.slice(page*10, page*10 + 10);

    function handlePageChange(p)
    {
        setPage(p);
    }
    
    let maxPages = Math.ceil(games.length/10);

    let pages = [];
    pages.push(
        <Pagination.First key="first" disabled={page <= 0} onClick={() => handlePageChange(0)} />
    );
    pages.push(
        <Pagination.Prev key="prev" disabled={page - 1 <= 0} onClick={() => handlePageChange(page - 1)} />
    );

    for (let i = 0; i < maxPages; i++)
    {
        if (i > page - 12 && i < page + 12)
        {
            pages.push(
                <Pagination.Item key={i} active={i == page} onClick={() => handlePageChange(i)}>{i + 1}</Pagination.Item>
            );
        }
        else if (i == page - 12 || i == page + 12)
        {
            pages.push(
                <Pagination.Ellipsis key={i} />
            );
        }
    }

    pages.push(
        <Pagination.Next key="next" disabled={page + 1 >= maxPages} onClick={() => handlePageChange(page + 1)} />
    );
    pages.push(
        <Pagination.Last key="last" disabled={page + 1 >= maxPages} onClick={() => handlePageChange(maxPages - 1)} />
    );
    
    return (
        <>
            {displayGames.map(game => {
                return (
                    <Row key={game.id} className="game">
                        <Col xs={12} lg={2} className="p-2">
                            <h3>{game.title}</h3>
                        </Col>
                        <Col xs={12} lg={2} className="p-2">
                            <ImageModal  size="sm" thumbUrl={game.coverUrl} bigUrl={game.coverUrlBig} />
                        </Col>
                        <Col xs={12} lg={8} xl={4} className="p-2 overflow-auto">
                            <Stack direction="horizontal" gap={3}>
                                {game.screenshots.map(screen => {
                                    return (
                                        <ImageModal key={screen.id} size="xl" thumbUrl={screen.url} bigUrl={screen.urlBig} />
                                    );
                                })}
                            </Stack>
                        </Col >
                        <Col xs={3} xl={1} className="p-2">
                            <div>
                                <b>Мультиплеер</b><br />
                                Онлайн {(game.onlineMultiplayer)? '✔': '✘'} <br />
                                Оффлайн {(game.offlineMultiplayer)? '✔': '✘'} <br />
                                {game.offlineMultiplayer && `Игроков оффлайн: ${game.players}`}
                            </div>
                        </Col>
                        <Col xs={3} xl={1} className="p-2">
                            <b>Платформы</b><br />
                            <div className="game-col overflow-auto">
                                {game.platform.map(platform => {
                                    return (
                                        <Fragment key={platform.id}>{platform.text}<br /></Fragment>
                                    );
                                })}
                            </div>
                        </Col>
                        <Col xs={3} xl={1} className="p-2">
                            <b>Язык</b><br />
                            <div className="game-col overflow-auto">
                                {game.textLanguage.map(lang => {
                                    return (
                                        <Fragment key={lang.id}>{lang.text}<br /></Fragment>
                                    );
                                })}
                            </div>
                        </Col>
                        <Col xs={3} xl={1} className="p-2">
                            <b>Озвучка</b><br />
                            <div className="game-col overflow-auto">
                                {game.voiceLanguage.map(lang => {
                                    return (
                                        <Fragment key={lang.id}>{lang.text}<br /></Fragment>
                                    );
                                })}
                            </div>
                        </Col>
                    </Row>
                );
            })}

            <Row><Pagination size="sm">{pages}</Pagination></Row>
        </>
    );
}

export default GamesList;