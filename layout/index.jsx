const { Component, Fragment } = require('inferno');
const Paginator = require('hexo-component-inferno/lib/view/misc/paginator');
const Article = require('./common/article');

module.exports = class extends Component {
    render() {
        const { config, page, helper } = this.props;
        const { __, url_for } = helper;
        
        // 判断是否为根目录
        const isRoot = page.path === '/'; // 根目录路径，根据需求调整判断条件
        if (isRoot) {
            // 根目录返回单页内容
            return <Article config={config} page={page} helper={helper} index={false} />;
        } else {
            // 非根目录，返回列表和分页
            return (
                <Fragment>
                    {page.posts.map(post => (
                        <Article config={config} page={post} helper={helper} index={true} />
                    ))}
                    {page.total > 1 ? (
                        <Paginator
                            current={page.current}
                            total={page.total}
                            baseUrl={page.base}
                            path={config.pagination_dir}
                            urlFor={url_for}
                            prevTitle={__('common.prev')}
                            nextTitle={__('common.next')}
                        />
                    ) : null}
                </Fragment>
            );
        }
    }
};
