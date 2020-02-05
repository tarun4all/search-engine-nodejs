import React, {Component} from 'react';
import {SearchInput} from "../components/searchInput";
// import {PaginationBar} from "../components/paginationBar";
import {PaginationBar} from "../components/paginationBar";

export class SearchScreen extends Component {
    render() {
        return (
            <div>
                <div className="search-result-header clearfix">
                    <img src="images/googlelogo.png" className="header-logo"/>
                    <div className="search-header">
                        <SearchInput/>
                    </div>
                </div>
                <section className="wrapper-section result-wrapper">
                    <div className="left-content">
                        <div className="content-row">
                            <div className="heading-title">
                                <a href="">
                                    <div className="link-title">Asadaa Asada Profiles | Facebook</div>
                                    <span>www.facebook.com › public › Asadaa-Asada</span>
                                </a>
                            </div>
                            <div className="description">
                                Austin Dafora Horton (4 August 1890 – 4 March 1965) also known as Asadata Dafora was a
                                Sierra Leonean
                                multidisciplinary musician. He was one of the first ...
                            </div>
                        </div>
                        <div className="content-row">
                            <div className="heading-title">
                                <a href="">
                                    <div className="link-title">Asadaa Asada Profiles | Facebook</div>
                                    <span>www.facebook.com › public › Asadaa-Asada</span>
                                </a>
                            </div>
                            <div className="description">
                                Austin Dafora Horton (4 August 1890 – 4 March 1965) also known as Asadata Dafora was a
                                Sierra Leonean
                                multidisciplinary musician. He was one of the first ...
                            </div>
                        </div>
                        <div className="content-row">
                            <div className="heading-title">
                                <a href="">
                                    <div className="link-title">Asadaa Asada Profiles | Facebook</div>
                                    <span>www.facebook.com › public › Asadaa-Asada</span>
                                </a>
                            </div>
                            <div className="description">
                                Austin Dafora Horton (4 August 1890 – 4 March 1965) also known as Asadata Dafora was a
                                Sierra Leonean
                                multidisciplinary musician. He was one of the first ...
                            </div>
                        </div>
                        <div className="content-row">
                            <div className="heading-title">
                                <a href="">
                                    <div className="link-title">Asadaa Asada Profiles | Facebook</div>
                                    <span>www.facebook.com › public › Asadaa-Asada</span>
                                </a>
                            </div>
                            <div className="description">
                                Austin Dafora Horton (4 August 1890 – 4 March 1965) also known as Asadata Dafora was a
                                Sierra Leonean
                                multidisciplinary musician. He was one of the first ...
                            </div>
                        </div>
                        <div className="content-row">
                            <div className="heading-title">
                                <a href="">
                                    <div className="link-title">Asadaa Asada Profiles | Facebook</div>
                                    <span>www.facebook.com › public › Asadaa-Asada</span>
                                </a>
                            </div>
                            <div className="description">
                                Austin Dafora Horton (4 August 1890 – 4 March 1965) also known as Asadata Dafora was a
                                Sierra Leonean
                                multidisciplinary musician. He was one of the first ...
                            </div>
                        </div>
                        <div className="content-row">
                            <div className="heading-title">
                                <a href="">
                                    <div className="link-title">Asadaa Asada Profiles | Facebook</div>
                                    <span>www.facebook.com › public › Asadaa-Asada</span>
                                </a>
                            </div>
                            <div className="description">
                                Austin Dafora Horton (4 August 1890 – 4 March 1965) also known as Asadata Dafora was a
                                Sierra Leonean
                                multidisciplinary musician. He was one of the first ...
                            </div>
                        </div>
                        <div className="content-row">
                            <div className="heading-title">
                                <a href="">
                                    <div className="link-title">Asadaa Asada Profiles | Facebook</div>
                                    <span>www.facebook.com › public › Asadaa-Asada</span>
                                </a>
                            </div>
                            <div className="description">
                                Austin Dafora Horton (4 August 1890 – 4 March 1965) also known as Asadata Dafora was a
                                Sierra Leonean
                                multidisciplinary musician. He was one of the first ...
                            </div>
                        </div>
                        <div className="pagination-section">
                            <PaginationBar/>
                        </div>
                    </div>
                </section>
            </div>
        )

    }
}
