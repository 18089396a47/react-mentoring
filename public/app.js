import React, { Component } from 'react';
import './commonStyles';
import PageHeader from './components/pageHeader/pageHeader';
import PageFooter from './components/pageFooter/pageFooter';
import FilmsContainer from './components/filmsContainer/filmsContainer';

export default class App extends Component {
    render() {
        return (
            <div>
                <div className="content">
                    <PageHeader />
                    <main>
                        <FilmsContainer />
                    </main>
                </div>
                <PageFooter />
            </div>
        );
    }
}
