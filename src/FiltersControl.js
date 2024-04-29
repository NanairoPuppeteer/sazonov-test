import { Accordion, Form, Row, Col } from "react-bootstrap";
import './FiltersControl.css';

function PlayersFilter({ players, onUpdateFilters })
{
    return (
        <>
            <Form.Label>Игроков оффлайн</Form.Label>
            <Form.Control
                onChange={onUpdateFilters}
                value={players}
                className="players"
                size="sm"
                name="players"
                type="number"/>
        </>
    );
}

function FiltersControl({ filters, multiplayerTypes, platforms, languages, onUpdateFilters }) {
    return (
        <Form as={Accordion} className="filters">
            <Accordion.Item eventKey="0">
                <Accordion.Header className="filters">Фильтры</Accordion.Header>
                <Accordion.Body as={Row} xs sm={1} md={3}>
                    <Form.Group as={Col} controlId="platform">
                        <Form.Label>Платформа</Form.Label>
                        <Form.Select size="sm" name="platform" onChange={onUpdateFilters} value={filters.platform}>
                            {
                                platforms.map((item) => {
                                    return <option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.text}
                                    </option>
                                })
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="multiplayerType">
                        <Form.Label>Тип мультиплеера</Form.Label>
                        <Form.Select size="sm" name="multiplayerType" onChange={onUpdateFilters} value={filters.multiplayerType}>
                            {
                                multiplayerTypes.map((item) => {
                                    return <option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.text}
                                    </option>
                                })
                            }
                        </Form.Select>
                        {
                            filters.multiplayerType == 2 &&
                            <PlayersFilter
                                players={filters.players}
                                onUpdateFilters={onUpdateFilters}
                            />
                        }
                    </Form.Group>
                    <Form.Group as={Col} controlId="language">
                        <Form.Label>Язык</Form.Label>
                        <Form.Select size="sm" name="textLanguage" onChange={onUpdateFilters} value={filters.textLanguage}>
                            {
                                languages.map((item) => {
                                    return <option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.text}
                                    </option>
                                })
                            }
                        </Form.Select>
                        <Form.Label>Язык озвучки</Form.Label>
                        <Form.Select size="sm" name="voiceLanguage" onChange={onUpdateFilters} value={filters.voiceLanguage}>
                            {
                                languages.map((item) => {
                                    return <option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.text}
                                    </option>
                                })
                            }
                        </Form.Select>
                    </Form.Group>
                </Accordion.Body>
            </Accordion.Item>
        </Form>
    );
}

export default FiltersControl;