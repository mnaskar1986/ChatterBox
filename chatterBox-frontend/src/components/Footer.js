import { React } from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="py-4 text-center">
                        Copyright &copy; 2025 Madhumita
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;