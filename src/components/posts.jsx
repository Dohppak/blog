import React from 'react';
import dateformat from 'dateformat';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import groupBy from 'lodash/groupBy';
import last from 'lodash/last';
import { Link as GatsbyLink } from 'gatsby';
import TagsList from './tags-list';

const groupPosts = posts => groupBy(posts, p => last(p.frontmatter.tags.split(' ')));


const Header = styled.header(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.smallMedia]: {
    flexDirection: 'column-reverse',
    alignItems: 'flex-start',
  },
}));

const H3 = styled.h3({
  margin: '3em 0 1em 0',
  fontFamily: "'Times','Noto Serif KR'",
  fontWeight: 'bold',
  fontStyle: 'italic',
  opacity: 0.35,
});

const Article = styled.article(({ theme }) => ({
  marginBottom: theme.spacing,
}));

const H4 = styled.h4({
  margin: 0,
});

const Link = styled(GatsbyLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.textColor,
  transition: 'color 250ms linear',
  ':hover': {
    color: theme.accentColor,
  },
}));

const Small = styled.h5({
  fontWeight: 'normal',
  color: 'rgba(0,0,0,0.5)',
  margin: 0,
});

const Posts = ({ posts }) => {
  const grouped = groupPosts(posts);
  const years = Object.keys(grouped).sort();
  return (
    <section>
      {years.map(year => (
        <section key={year}>
          <H3>{year}</H3>
          {grouped[year].map(post => (
            <Article key={post.frontmatter.path}>
              <Header>
                <H4>
                  <Link to={post.frontmatter.path}>
                    {post.frontmatter.title}
                  </Link>
                </H4>
                <Small>
                  <time dateTime={dateformat(post.frontmatter.date, 'isoDateTime')}>
                    {dateformat(post.frontmatter.date, 'mmmm d, yyyy')}
                  </time>
                </Small>
              </Header>
              <footer>
                <TagsList tags={post.frontmatter.tags} />
              </footer>
            </Article>
          ))}
        </section>
      ))}
    </section>
  );
};

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    node: PropTypes.shape({
      frontmatter: PropTypes.shape({
        path: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
      }).isRequired,
    }),
  })).isRequired,
};

export default Posts;
