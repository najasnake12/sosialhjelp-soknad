import React from "react";
import styled from "styled-components";
import {Title} from "@navikt/ds-react";
import {EditAnswerLink} from "../Oppsummering";

const StyledQuestion = styled.div`
    margin-bottom: 2rem;
`;

const HeadingWithEditLink = styled.div`
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
`;

export const Question = (props: {title: string; children: any}) => {
    return (
        <StyledQuestion>
            <HeadingWithEditLink>
                <Title level="3" size="s" spacing>
                    {props.title}
                </Title>
                <EditAnswerLink steg={1} questionId="" />
            </HeadingWithEditLink>
            {props.children}
        </StyledQuestion>
    );
};