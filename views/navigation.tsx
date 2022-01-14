import Link from 'next/link'
import { FC, useCallback, useState, VFC } from 'react'
import styled from 'styled-components'
import { NavigationItem, useNavigation } from '../services/navigation'
import { RemoteData } from '../services/remote-data'

import classNames from 'classnames'

const NavigationC: VFC<{ className?: string; data: ReturnType<typeof useNavigation> }> = ({ className, data }) => {
  return (
    <div className={className}>
      {RemoteData.fold(
        data,
        () => null,
        () => (
          <div>Loading..</div>
        ),
        (data) => (
          <div>
            {data?.map((item) => (
              <NavItem key={item.id} model={item} />
            ))}
          </div>
        )
      )}
    </div>
  )
}

const NavItem: FC<{ model: NavigationItem }> = ({ model }) => {
  const [isOpen, setOpen] = useState<boolean>(false)
  const toggle = useCallback(() => {
    setOpen((state) => !state)
  }, [setOpen])

  return (
    <div className={classNames('navigation--item', { '--open': isOpen })}>
      <div className='nav-item'>
        <Link href={`/search/${model.slug}`}>{model.name}</Link>
        {model.itemCount && <span className='item-count'>{model.itemCount}</span>}

        {model.children.length > 0 && (
          <span className='submenu-toggle' onClick={toggle}>
            {isOpen ? '<' : '>'}
          </span>
        )}
      </div>
      {isOpen && (
        <div className='submenu'>
          {model.children.map((x) => (
            <NavItem model={x} key={x.id} />
          ))}
        </div>
      )}
    </div>
  )
}

export const Navigation = styled(NavigationC)`
  .navigation--item {
    .nav-item {
      padding: 8px;
      font-weight: normal;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      position: relative;

      display: flex;

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }

    &.--open {
      font-weight: bold;
      background-color: rgba(0, 0, 0, 0.1);
    }

    .item-count {
      font-size: 0.8em;
      margin-left: 8px;
      margin-right: 8px;
      padding: 6px;
      border-radius: 16px;
      background-color: #eee;
    }

    a {
      flex: 1;
    }

    .submenu-toggle {
      cursor: pointer;
      width: 20px;
      height: 20px;
      border: 1px solid #d00;
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }

    .submenu {
      padding-left: 8px;
    }
  }
`
