import { usePortfolioData } from './DataContext';
import './profile-hero.css';
import { TypingAnimatedSubtitle } from './profile-hero-animated-text';

export function ProfileHeader() {
    const { name, profilePicture, about } = usePortfolioData();
    return (
        <div className="profile-hero">
            <div className="profile-hero-bg" />
            <img src={profilePicture} alt="Profile" className="profile-hero-img" />
            <h1 className="profile-hero-title">{name}</h1>
            <h2 className="profile-hero-subtitle profile-hero-animated-subtitle-wrapper">
                <TypingAnimatedSubtitle />
            </h2>
            <p className="profile-hero-about">{about}</p>
        </div>
    );
}
