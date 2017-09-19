import React, { Component } from 'react';
import './pageHeaderStyles';
import SearchMovieWrapper from '../searchMovieWrapper/searchMovieWrapper';
import InfoPanel from '../infoPanel/infoPanel';
import FilmInfo from '../filmInfo/filmInfo';
import FilmCounter from '../filmCounter/filmCounter';
import SortByToggle from '../sortByToggle/sortByToggle';
import FilmsByInfo from '../filmsByInfo/filmsByInfo';

export default class PageHeader extends Component {
    render() {
        return (
            <header className="page-header">
                <div className="page-header__main-wrapper">
                    <div className="page-header__link-wrapper">
                        <a href="/" className="page-header__link">netflixroulette</a>
                        {true ? <a className="page-header__search-page-button" href="/" >Search</a> : null}
                    </div>
                    {false ?
                        <SearchMovieWrapper />
                        :
                        <FilmInfo
                            director={'Quentin Tarantino'}
                            show_title={'KILL BILL: VOL. 1'}
                            release_year={'2003'}
                            poster={'http://netflixroulette.net/api/posters/60031236.jpg'}
                            rating={'3.8'}
                            runtime={'111 min'}
                            show_cast={'Uma Thurman, Lucy Liu, Vivica A. Fox, Daryl Hannah, David Carradine, Michael Madsen, Julie Dreyfus, Chiaki Kuriyama, Sonny Chiba, Gordon Liu'}
                            summary={'An assassin is shot by her ruthless employer, Bill, and other members of their assassination circle. But she lives -- and plots her vengeance.'}
                        />
                    }
                </div>
                {false ?
                    <InfoPanel>
                        <FilmsByInfo director={'Quentin Tarantino'} />
                    </InfoPanel>
                    :
                    <InfoPanel>
                        <FilmCounter count={7} />
                        <SortByToggle />
                    </InfoPanel>
                }
            </header>
        );
    }
}
