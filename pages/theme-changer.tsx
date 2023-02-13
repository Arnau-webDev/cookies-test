import { ChangeEvent, useEffect, useState } from "react";
import { GetServerSideProps } from 'next';
import { Layout } from "../components/layouts";

import Cookies from 'js-cookie';
import axios from "axios";

import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

interface Props {
    theme: string,
    name: string
}

const ThemeChangerPage: React.FC<Props> = ({ theme, name }) => {

    console.log(theme, name);
    
    const [currentTheme, setCurrentTheme] = useState(theme);
    
    const onThemeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedTheme = e.target.value;
        setCurrentTheme(selectedTheme);

        localStorage.setItem('theme', selectedTheme);

        Cookies.set('theme', selectedTheme);
    }

    const onClick = async () => {
        const { data } = await axios.get('/api/hello');

        console.log(data);
    }

    useEffect(() => {
        console.log(localStorage.getItem('theme'));
    }, []);
    

  return (
    <Layout>
        <Card>
            <CardContent>
                <FormControl>
                    <FormLabel>Tema</FormLabel>
                    <RadioGroup value={currentTheme} onChange={onThemeChange}>
                        <FormControlLabel value='light' control={ <Radio /> } label="Light" />
                        <FormControlLabel value='dark' control={ <Radio /> } label="Dark" />
                        <FormControlLabel value='custom' control={ <Radio /> } label="Custom" />
                    </RadioGroup>
                </FormControl>

                <Button onClick={onClick}>
                    Solicitud
                </Button>
            </CardContent>
        </Card>
    </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { req } = ctx;

    const { theme = 'light', name = 'No name' } = req.cookies;

    const validThemes = ['light','dark','custom'];

    return {
        props: {
            theme: validThemes.includes( theme ) ? theme : 'dark',
            name
        }
    }
}

export default ThemeChangerPage;