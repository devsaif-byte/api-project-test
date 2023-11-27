/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function DarkFooter() {
  return (
    <footer className="footer" data-background-color="black">
      <Container>
        <nav>
          <ul>
            <li>
              <a
                href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSHwChfvjFMcLhrQtPNdgHNtfrPjZlPdPssVqLRTVhsLWljkQzbvKffBGgnjHJCtVZRSTKTm"
                target="_blank"
              >
                Mail
              </a>
            </li>
          </ul>
        </nav>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}, Designed by{" "}
          <a
            href="https://www.invisionapp.com?ref=nukr-dark-footer"
            target="_blank"
          >
            Invision
          </a>
          . Coded by{" "}
          <a href="#" target="_blank">
            Saif
          </a>
          .
        </div>
      </Container>
    </footer>
  );
}

export default DarkFooter;
