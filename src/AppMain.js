import React, { useEffect } from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import { useAppStateValue } from "./state/state"

import NavBar from './ui/navbar'
import Footer from "./ui/footer"
import News from './views/news'
import Main from './views/main'
import Organization from './views/organization'
import Documents from './views/documents'

import { getPages } from "./services/api"
import { when } from "./utils/clojure"
import { actions, payloadAction } from "./state/actions"

import './App.css';

export const AppMain = () => {
    const [{ pages }, dispatch] = useAppStateValue()
    useEffect(() => {
        const getData = async () => {
            const data = await getPages()
            when(pages.length !== data.length, 
                () => dispatch(payloadAction(actions.SAVE_PAGES, { pages: data })))
        }
        getData()
    })
    return (<div className="App">
        <header className="App-header">
            <NavBar>
                <Link to="/">Koti</Link>
                <Link to="/news">Uutiset</Link>
                <Link to="/pank">Organisaatio</Link>
                <Link to="/documents">Tietopankki</Link>
            </NavBar>
        </header>
        <main className="App-main">
            <Switch>
                <Route path='/news' component={News} />
                <Route path='/pank' exact component={Organization} />
                <Route path='/pank/:tab/' component={Organization} />
                <Route path='/documents' exact component={Documents} />
                <Route path='/documents/:tag/' component={Documents} />
                <Route path='/' component={Main} />
            </Switch>
        </main>
        <footer className="App-footer">
            <Footer />
        </footer>
    </div>)
}