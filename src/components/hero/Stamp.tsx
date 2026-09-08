import { profile } from '../../data/profile'

/*
  Postage stamp frame. The perforated edge is a card whose border is eaten away
  by a repeating radial gradient mask, so there is no image asset behind it and
  it stays crisp at any size.
*/
export default function Stamp() {
  return (
    <figure className="stamp">
      <div className="stamp__perforation">
        <div className="stamp__inner">
          <div className="stamp__photo">
            <img
              src="/portrait.jpg"
              alt={profile.name}
              width={488}
              height={623}
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </figure>
  )
}
